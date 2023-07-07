import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetails } from 'src/app/shared/pokemon-details.model';
import { MainService } from 'src/app/shared/services/main.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  pokemon?: PokemonDetails;
  pokemonId: number = 0;
  chart: any;

  constructor(
    private mainService: MainService,
    private router: Router,
    ) {
      


    }

  ngOnInit(): void {
    const routeId = this.router.url.match(/\d+/g);

    if (routeId !== null) {
      this.pokemonId = Number(routeId[0]);
    }

    this.getDetails();
    this.generateChart();
  }

  getDetails() {
    this.mainService.getDetails(this.pokemonId).subscribe((data: PokemonDetails) => {
      
      this.pokemon = data;
      console.log(this.pokemon)
    })
  }

  getImage() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
  }

  generateChart(){
    // Create the echarts instance
    let chartId: HTMLElement = document.getElementById('main')!;
    let myChart = echarts.init(chartId);

    // Draw the chart
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          // adjust the start angle
          startAngle: 180,
          label: {
            show: true,
            formatter(param: { name: string; percent: any; }) {
              // correct the percentage
              return param.name + ' (' + param.percent! * 2 + '%)';
            }
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
            {
              // make an record to fill the bottom 50%
              value: 1048 + 735 + 580 + 484 + 300,
              itemStyle: {
                // stop the chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none'
                }
              },
              label: {
                show: false
              }
            }
          ]
        }
      ]

    })
  }

}