import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent   {

  public readonly rules = [
    'Red goes first in the first game.',
    'Players must alternate turns, and only one disc can be dropped in each turn.',
    'The game ends when there is a 4-in-a-row or a stalemate.',
    'The starter of the previous game goes second on the next game.',
  ];

}
