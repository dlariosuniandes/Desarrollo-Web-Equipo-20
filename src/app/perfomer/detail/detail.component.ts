import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { Musician } from '../musician';
import { PerformerService } from '../perfomer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/album/album';

@Component({
  selector: 'performer-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  performer: Musician | Band;
  backUrl:string;

  @Input() performerDetail: Musician | Band;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private performerService: PerformerService
  ) {
    if(this.router.getCurrentNavigation()?.extras?.state?.backUrl)
    {
      this.backUrl = "/"+this.router.getCurrentNavigation().extras.state.backUrl
    }
  }

  performerId: number;
  typePerformer: string;
  ngOnChanges(): void {
    if (this.performerDetail instanceof Musician) {
      this.performerService
        .getMusicianDetail(this.performerDetail.id)
        .subscribe((cs) => {
          this.performer = cs;
        });
    } else if (this.performerDetail instanceof Band) {
      this.performerService
        .getBandDetail(this.performerDetail.id)
        .subscribe((cs) => {
          this.performer = cs;
        });
    }
  }

  ngOnInit(): void {
    if (this.performerDetail === undefined) {
      this.route.url.subscribe((test) => {
        this.typePerformer = test[0]['path'];
      });
      this.performerId = +this.route.snapshot.paramMap.get('id');
      console.log(this.typePerformer, this.performerId);
      if (this.typePerformer === 'band') {
        this.performerService
          .getBandDetail(this.performerId)
          .subscribe((cs) => {
            this.performer = cs;
          });
      } else if ((this.typePerformer = 'musician')) {
        this.performerService
          .getMusicianDetail(this.performerId)
          .subscribe((cs) => {
            this.performer = cs;
          });
      }
    }
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

  goBackDetail() {
    if(this.backUrl)
    {
      this.router.navigateByUrl(this.backUrl);
    }
    else
    {
      this.router.navigateByUrl('/performers/list');
    }
  }

  onSelect(album: Album) {
    this.router.navigateByUrl('/albums/' + album.darId(),{state:{backUrl:`/performers/${this.typePerformer}/${this.performerId}`}});
  }
}
