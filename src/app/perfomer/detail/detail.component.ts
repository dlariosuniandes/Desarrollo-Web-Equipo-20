import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { Musician } from '../musician';
import { PerformerService } from '../perfomer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  performer: Musician | Band;

  @Input() performerDetail: Musician | Band;
  constructor(private performerService: PerformerService) {}

  ngOnChanges(): void {
    if (this.performerDetail instanceof Musician) {
      this.performerService
        .getMusicianDetail(this.performerDetail.id)
        .subscribe((cs) => {
          this.performer = cs;
          console.log(cs);
        });
    } else if (this.performerDetail instanceof Band) {
      this.performerService
        .getBandDetail(this.performerDetail.id)
        .subscribe((cs) => {
          this.performer = cs;
          console.log(cs);
        });
    }
  }

  ngOnInit(): void {
    
  }

  returnDatePerfomer(): string {
    if (this.performer instanceof Musician) {
      return this.formatDate(this.performer.getBirthDate());
    } else {
      return this.formatDate(this.performer.getCreationDate());
    }
  }

  formatDate(date: Date): string {
    const formatDate = new Date(date);
    const year = formatDate.getFullYear();
    return `(${year})`;
  }
}
