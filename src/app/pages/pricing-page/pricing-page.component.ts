import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, type OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);
  ngOnInit(): void {
    // console.log({ platform: this.platform });

    // if (isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing page';
    // }

    this.title.setTitle('Pricing page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,testdev,angular,PRO' });
  }

}
