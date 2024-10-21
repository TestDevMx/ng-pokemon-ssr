import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Contact Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,testdev,angular,PRO' });
  }

}
