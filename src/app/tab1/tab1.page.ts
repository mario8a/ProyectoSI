import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Escolar', 'Domestica', 'Trabajo', 'Pendiente', 'Actividad'];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56], label: 'Series A' },
    { data: [28, 48, 40, 70, 96], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  

}
