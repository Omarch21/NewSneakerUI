import { Component, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../register-login/service/auth.service';
import { Router } from '@angular/router';
import { NewsService } from '../inventory/service/news.service';
import { tap, switchMap, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChartOptions } from '../../models/ChartOptions';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SneakerService } from '../inventory/service/sneaker.service';
import { Sneaker } from '../../models/sneaker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgApexchartsModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  news: any[] = [];
  sneakerCount: number = 0;
  releases: any[] = [];
  maxValue: number = 10000;
  
  loading: WritableSignal<boolean> = signal(true);
  loadingReleases: WritableSignal<boolean> = signal(true);


  labels1: any[] = ['Amount Spent']
  labels2: any[] = ['Estimated Liquidity']
  labels3: any[] = ['Total Profit']

  series1: any[] = [];
  series2: any[] = [];
  series3: any[] = [];
  total: number = 0;
  resellTotal: number = 0;
  profit: number = 0;

  chartOptions1: Partial<ChartOptions> = {};
  chartOptions2: Partial<ChartOptions> = {};
  chartOptions3: Partial<ChartOptions> = {};


  constructor(private authService: AuthService, private newsService: NewsService, private sneakerService: SneakerService) { }

  ngOnInit() {
    

    this.authService.getLoggedInUserData().pipe(
      tap(user => this.user = user),
      switchMap(user => this.sneakerService.getSneakersByUserId(user.id)),
      tap(data => this.setGraphData(data)),
      tap(()=> this.initGraphs()),
      finalize(() => this.loading.set(false))
    ).subscribe();

    this.newsService.getNews().pipe(
      tap((data) => this.news = data),
      tap((data) => console.log(data))
    ).subscribe();

    this.newsService.getReleases().pipe(
      tap((releases: any[])=> this.releases = releases),
      finalize(() => this.loadingReleases.set(false))
    ).subscribe();

    
  }

  initGraphs(): void{
    this.initGraph1();
    this.initGraph2();
    this.initGraph3();
  }

  setGraphData(data:any){
    this.sneakerCount = data.length;
    this.series1 = [this.getSneakersTotal(data)];
    this.series2 = [this.getSneakersResellTotal(data)];
    this.series3 = [this.getProfit()];
  }

  getSneakersTotal(sneakers: Sneaker[]) {
    this.total = sneakers.reduce((sum, item) => sum + item.retail!, 0);
    return (this.total / this.maxValue) * 75;
  }

  getSneakersResellTotal(sneakers: Sneaker[]) {
    this.resellTotal = sneakers.reduce((sum, item) => sum + item.resellPrice!, 0);
    return (this.resellTotal / this.maxValue) * 75;
  }

  getProfit(){
    this.profit = (this.resellTotal - this.total);
    return (this.profit / this.maxValue) * 75;
  }

  initGraph1() { /* Graph for how much users spent */
    this.chartOptions1 = {
      series: [],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              color: '#111',
              formatter: () => this.total.toString(),
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['red'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  initGraph2() { /* Graph for how much users spent */
    this.chartOptions2 = {
      series: [],
      chart: this.chartOptions1.chart,
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              color: '#111',
              formatter: () => this.resellTotal.toString(),
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['red'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  initGraph3() { /* Graph for how much users spent */
    this.chartOptions3 = {
      series: [],
      chart: this.chartOptions1.chart,
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              color: '#111',
              formatter: () => `${this.resellTotal - this.total}`,
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: this.profit > 0 ? ['green'] : ['red']
      },
      stroke: {
        lineCap: 'round'
      }
    };
  }

  goTo(data:any){
    window.open(data, '_blank')
  }
}
