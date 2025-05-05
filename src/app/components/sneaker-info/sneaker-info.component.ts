import { Component, ElementRef, ViewChild } from '@angular/core';
import { SneakerService } from '../inventory/service/sneaker.service';
import { ActivatedRoute } from '@angular/router';
import { Sneaker } from '../../models/sneaker';
import { CommonModule, DatePipe, Location, NumberSymbol } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from "ng-apexcharts"
import { BrowserModule } from '@angular/platform-browser';
import { ChartOptions } from '../../models/ChartOptions';
import { tap, switchMap } from 'rxjs';
import { SneakerPrice } from '../../models/SneakerPrice';
@Component({
    selector: 'app-sneaker-info',
    imports: [MatTooltipModule, CommonModule, NgApexchartsModule],
    templateUrl: './sneaker-info.component.html',
    styleUrl: './sneaker-info.component.css',
    providers: [DatePipe]
})

export class SneakerInfoComponent {
    id: string = "";
    sneaker: Sneaker | undefined;
    categories: string[] = [];
    tableData: any[] = [];
    chartOptions: Partial<ChartOptions> = {}
    sortColumns: any;
    sortDirection: any;
    
    constructor(private sneakerService: SneakerService, private route: ActivatedRoute, private location: Location, private datePipe: DatePipe) { }

    ngOnInit() {
        this.sneakerInitData();
    }

    sneakerInitData() {
        this.route.paramMap.subscribe(param => {
            this.id = param.get('id')!;
            this.sneakerService.getSneakerById(this.id).pipe(
                tap(sneaker => this.sneaker = sneaker),
                switchMap(() => this.sneakerService.getSneakerPricesById(this.sneaker?.id!)),
                tap((data: SneakerPrice[]) => {
                    const { seriesData, categories } = this.mapGraphData(data);
                    this.updateGraph(categories, seriesData);

                }),
                tap(() => console.log(this.tableData))
            ).subscribe();
        })
    }

    getPercentage(retail?: number, resell?: number): number {
        if (retail && resell)
            return Math.abs(((retail - resell) / resell) * 100);

        return 0;
    }

    mapGraphData(sneakerPrices: SneakerPrice[]) {
        const map = new Map<string, number>();
        sneakerPrices.forEach(price => {
            const maxPrice = map.get(this.datePipe.transform(price.date, 'MM-dd-yyyy')!);
            if (!maxPrice || price.price > maxPrice)
                map.set(this.datePipe.transform(price.date, 'MM-dd-yyyy')!, price.price);
        })
        
        this.tableData = Array.from(map.entries()).map(([date, price])=>({
            name: `${this.sneaker?.brand!} ${this.sneaker?.silhouette} "${this.sneaker?.nickname}`,
            totalCost: Math.floor(this.sneaker?.retail! *1.1),
            date: date,
            price: price,
            priceDifference: price - this.sneaker?.retail!
        }))
        return { seriesData: Array.from(map.values()), categories: Array.from(map.keys()) };
    }

    updateGraph(category: any[], series: any[]) {
        this.categories = category;
        //this.data = series;

        this.chartOptions = {
            xaxis: {
                type: "category",
                categories: category
            },
            series: [
                {
                    data: series,
                    name: 'Cost'
                }
            ],
            chart: {
                height: 650,
                type: "line"
            },
            stroke: {
                width: 7,
                curve: "smooth"
            },
            title: {
                text: "Resell Trend",
                align: "center",
                style: {
                    fontSize: "16px",
                    color: "black",
                    fontWeight: "600"
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    gradientToColors: ["red"],
                    shadeIntensity: 1,
                    type: "horizontal",
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100],
                },
            },
            markers: {
                size: 4,
                colors: ["red"],
                strokeColors: "#fff",
                strokeWidth: 2,
                hover: {
                    size: 7,
                },
            },
            yaxis: {
                min:  Math.ceil(Math.min(...series)*0.85),
                max: Math.ceil(Math.max(...series)*1.15),
                title: {
                    text: "Price",
                },
                tickAmount: 10
            },
        }
    }

    goBack() {
        this.location.back();
    }

    sort(column:any){
        if(this.sortColumns == column){
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumns = column;
            this.sortDirection = 'asc';
        }

        this.tableData.sort((a,b)=>{
            const valueA = a[column];
            const valueB = b[column];

            if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        })

    }

    getLast10(data:any){
        return data.slice(-10);
    }
}
