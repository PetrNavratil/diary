import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { EducationModel } from '../../shared/models/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationComponent implements OnChanges {

  @Input() data: EducationModel = {
    druh: '',
    zanr: '',
    smer: '',
    forma: '',
    jazyk: '',
    postavy: '',
    obsah: '',
    tema: '',
    hodnoceni: ''
  };
  @Input() newEdication = true;
  @Output() dataUpdate: EventEmitter<EducationModel> = new EventEmitter<EducationModel>();

  selectedZanr = [];
  druhs = [
    'Lyrika',
    'Epika',
    'Lyrikoepika',
    'Drama'
  ];
  zanrs = {
    Epika: [
      'Anekdota',
      'Historka',
      'Bajka',
      'Báje (mýty)',
      'Legenda',
      'Pověst',
      'Pohádka',
      'Povídka',
      'Novela',
      'Romaneto',
      'Epos',
      'Román'
    ],
    Lyrikoepika: [
      'Balada',
      'Romance',
      'Básnická povídka'
    ],
    Lyrika: [
      'Píseň',
      'Elegie',
      'Hymnus',
      'Óda',
      'Žalmy',
      'Epigram',
      'Pásmo'
    ],
    Drama: [
      'Tragédie',
      'Komedie',
      'Činohra',
      'Veselohra',
      'Melodram',
      'Tragikomedie',
      'Absurdní drama',
      'Aktovka',
      'Monodrama'
    ]
  };

  smers = [
    'Antika',
    'Středověk',
    'Humanismus a renesance',
    'Baroko',
    'Klasicismus a osvícenství',
    'Preromantismus',
    'Romantismus',
    'Biedermeir',
    'Realismus',
    'Naturalismus',
    'Moderna - Symbolismus',
    'Moderna - Impresionismus',
    'Moderna - Dekadence',
    'Avantgarda - Expresionismus',
    'Avantgarda - Surrealismus',
    'Avantgarda - Dadaismus',
    'Avantgarda - Poetismus',
    'Existencionalismus',
    'Socialistický realismus',
    'Magický realismus',
    'Absurdní drama',
    'Postmoderna'
  ];

  ngOnChanges() {
    if (this.data.druh) {
      this.selectedZanr = this.zanrs[this.data.druh];
    }
  }


  saveEducation(form) {
    this.dataUpdate.emit(form.value);
  }

  setZanr(druh: any) {
    this.selectedZanr = this.zanrs[druh.value];
  }

}
