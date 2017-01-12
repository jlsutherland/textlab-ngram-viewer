import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        width: 800,
        margin : {
          top: 20,
          right: 20,
          bottom: 80,
          left: 200
        },
        useInteractiveGuideline: true,
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'Year'
        },
        yAxis: {
          axisLabel: 'Relative Frequency',
          axisLabelDistance: 30
        }
      }
    };
    this.data = [];
  }


  submit() {
    let items = this.query.split(',');
    console.log(items);
    if(this.query) {
      items.map(val => {
        this.$http.get('/api/timeseries/' + val)
          .then(res => {
            let freqs = res.data[0].freqs;
            this.data.push({
              key: val,
              values: freqs.map((v, i) => {
                return { x: i, y: v };
              })
            });
          });
      });
      this.query = null;
    }
  }

  clear(){
    this.data = [];
  }

}

export default angular.module('textlabApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
