import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetails } from 'src/app/shared/models/pokemon-details.model';
import { MainService } from 'src/app/shared/services/main.service';
import * as echarts from 'echarts';
import { Stat } from '../model/stat.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  pokemon?: PokemonDetails;
  pokemonId: number = 0;
  stats: Stat[] = [];

  constructor(
    private mainService: MainService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const routeId = this.router.url.match(/\d+/g);

    if (routeId !== null) {
      this.pokemonId = Number(routeId[0]);
    }

    this.getDetails();
  }

  getDetails() {
    this.mainService.getDetails(this.pokemonId).subscribe((data: PokemonDetails) => {
      this.pokemon = data;
      this.getStats();
      this.generateChart();
    })
  }

  getImage() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
  }

  getStats() {
    this.pokemon?.stats.map(data => {
      const stat = { value: data.base_stat, name: data.stat.name };
      this.stats.push(stat)
    });
  }

  generateChart(){
    let chartId: HTMLElement = document.getElementById('chart')!;
    let myChart = echarts.init(chartId);

    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Stat',
          type: 'pie',
          radius: ['40%', '70%'],
          startAngle: 180,
          label: {
            show: true,
            formatter(param: { name: string; percent: any; }) {
              return param.name + ' (' + param.percent! * 2 + '%)';
            }
          },
          data: this.stats
        }
      ]
    })
  }
}
