import { Component, OnInit } from '@angular/core';
import { PerformerService } from '../perfomer.service';
import { Musician } from '../musician';
import { Band } from '../band';

@Component({
  selector: 'artists-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private artistService: PerformerService) {}
  musicians: Array<Musician>;
  bands: Array<Band>;

  getMusicianList() {
    this.artistService.getMusicians().subscribe( cs => {
      this.musicians = cs
    })
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
  ngOnInit(): void {
    this.getMusicianList();
    this.getBandList();
  }
}
