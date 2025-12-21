import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};
// Library:: Services
import { LibraryApi } from '../../services/api/library-api';
//
@Component({
  selector: 'library-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  // Library:: Global Vars & Funcs
  public library_loading = true;
  public chartOptions: Partial<ChartOptions>;

  // Library:: Constructor
  constructor( 
    private _library_api: LibraryApi 
  ) {
    this.chartOptions = {
      series: [
        { name: "Members", data: [10, 41, 35, 51, 49, 62] }
      ],
      chart: {
        type: "line",
        height: 300,
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: {
          style: {
            colors: 'rgba(255,255,255,0.4)'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#fff'],
          }
        }
      },
    };
  }

  // Library:: Get
  public library_stats: any = {};
  library_get_stats() {
    this._library_api.library_get('dashboard').subscribe((response: any) => {
      this.library_stats = response.body;
      this.library_loading = false;
      //
      const data = this.library_stats.members_growth || [];
      // Extract values + labels
      const values = data.map((item: any) => item.value);
      const labels = data.map((item: any) => item.month);
      // Update ApexCharts options
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          { name: "Members", data: values }
        ],
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: labels
        }
      };
    });
  }
  ngOnInit(): void {
    this.library_get_stats();
  }

}
