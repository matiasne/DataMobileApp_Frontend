import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const LoaderFadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    /* trigger('loaderFadeInOutAnimation', [
        transition(':enter', [
          style({
              opacity: 0
          }),
          animate(350)
        ]),
        transition(':leave', [
          style({
                opacity: 1,
            }), 
          animate(350)
        ])
      ]);*/


    trigger('loaderFadeInOutAnimation', [
      state('show', style({
        opacity: 0
      })),
      state('hide',   style({
        opacity: 1
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])