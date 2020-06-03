import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  games: any[] = [];

  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db
      .collection('goty')
      .valueChanges()
      .pipe(
        map((res: Game[]) =>
          res.map(({ name, votes }) => ({ name, value: votes }))
        )
      )
      .subscribe((gameVotes) => {
        // console.log(games);
        this.games = gameVotes;
      });
  }
}
