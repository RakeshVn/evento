import { Component, OnInit } from '@angular/core';
import * as Chart from "chart.js";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart
  eventTypeChart
  dashboardData = {
    total: 0,
    today: 0,
    yesterday: 0,
    registeredGraphData: [],
    eventsTypeGraphData: []
  }

  constructor(
    private _CommonService: CommonService
  ) { }

  ngOnInit() {
    this.getData()
  }

  initCharts() {

    let labels = []
    let data = []
    let colorIndex = 0
    const graphColors = ["#57CCA0", "#6D78AD", "#DF7970", "#4C9CA0", "#C9D45C", "#4e4ca0", "#a04c9e"]

    for (const iterator of this.dashboardData['registeredGraphData']) {
      labels.push(iterator._id)
      data.push(iterator.count)
    }

    this.chart = new Chart('eventsRegistered', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Registered Events',
          data,
          backgroundColor: ["#57CCA0", "#6D78AD", "#DF7970", "#4C9CA0", "#C9D45C", "#4e4ca0", "#a04c9e"],
          borderColor: ["#57CCA0", "#6D78AD", "#DF7970", "#4C9CA0", "#C9D45C", "#4e4ca0", "#a04c9e"],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    let graphData = {}

    for (const i of this.dashboardData['eventsTypeGraphData']) {
      let label = i._id.type
      if (graphData.hasOwnProperty(label)) {
        if (graphData[label].hasOwnProperty(i._id.date)) graphData[label][i._id.date] += Number(i.count)
        else graphData[label][i._id.date] = Number(i.count)
      } else graphData[label] = { [i._id.date]: Number(i.count) }
    }

    let typeLabels = []
    let datasets = []

    colorIndex = 0

    for (const key in graphData) {
      let data = {
        data: [],
        label: key,
        borderColor: graphColors[colorIndex++],
        fill: false
      }
      for (const iterator in graphData[key]) {
        if (typeLabels.indexOf(iterator) == -1) typeLabels.push(iterator)
        data.data.push(graphData[key][iterator])
      }
      datasets.push(data)
    }

    this.eventTypeChart = new Chart('eventType', {
      type: 'line',
      data: {
        labels: typeLabels,
        datasets
      },
      options: {
        title: {
          display: false,
          text: ''
        }
      }
    });

  }

  getData() {
    this._CommonService.get('event/dashboard').subscribe(res => {
      this.dashboardData = res['data']
      this.initCharts()
    }, error => {
      console.error(error)
    })
  }

}
