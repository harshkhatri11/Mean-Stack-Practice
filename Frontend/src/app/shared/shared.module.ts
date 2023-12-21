import { NgModule } from '@angular/core';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MenuItems } from './menu-items';
import { DynamicMomentPipe } from './pipes/dynamic-moment.pipe';
import { DatePipe } from '@angular/common';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { NumberToWordGlobalStandardPipe } from './pipes/number-to-word-global-standard.pipe';
import { NumberToWordIndianStandardPipe } from './pipes/number-to-word-indian-standard.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    DynamicMomentPipe,
    HighlightPipe,
    SearchPipe,
    NumberToWordGlobalStandardPipe,
    NumberToWordIndianStandardPipe,
    TruncateTextPipe
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    DynamicMomentPipe,
    HighlightPipe,
    SearchPipe,
    NumberToWordGlobalStandardPipe,
    NumberToWordIndianStandardPipe,
    TruncateTextPipe
  ],
  providers: [MenuItems,DatePipe]
})
export class SharedModule { }
