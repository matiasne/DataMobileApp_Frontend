
import { trigger, state, animate, transition, style } from '@angular/animations';
 
export const fadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInOutAnimation', [
        transition(':enter', [
          style({
                  opacity: 0,
                  transform: 'translateY(-10%)'
          }),
          animate(350)
        ]),
        transition(':leave', [
            style({
                  opacity: '*',
                  transform: 'translateY(10%)'
              }), 
            animate(350)
        ])
      ]);
   