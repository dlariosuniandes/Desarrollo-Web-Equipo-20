import { Component, OnInit } from '@angular/core';
import { PerformerService } from '../perfomer.service';
import { Musician } from '../musician';
import { Band } from '../band';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'artists-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private artistService: PerformerService,
    private router: Router
  ) {}
  musicians: Array<Musician>;
  bands: Array<Band>;
  selected: boolean = false;
  currentPerformer: Musician | Band;

  getMusicianList() {
    this.artistService.getMusicians().subscribe((cs) => {
      this.musicians = cs.concat(cs).concat(cs).concat(cs).concat(cs);
      console.log(this.musicians)
    });
  }
  getBandList() {
    this.artistService.getBands().subscribe((cs) => {
      this.bands = cs;
    });
  }
  formatDate(date: Date) {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear();
    return `(${year})`;
  }
  onSelect(performer: Musician | Band) {
    if (performer instanceof Musician) {
      this.router.navigateByUrl('performers/musician/' + performer.id);
    } else if (performer instanceof Band) {
      this.router.navigateByUrl('performers/band/' + performer.id);
    }
  }

  ngOnInit(): void {
    this.getMusicianList();
    this.getBandList();
  }
}
