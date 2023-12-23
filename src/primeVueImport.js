import PrimeVue from "primevue/config";
import Lara from "@/presets/lara";

import Button from "primevue/button" 
import InputText from "primevue/InputText"
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';



import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import BadgeDirective from 'primevue/badgedirective';

const setPrimeVue = (app) => {
    app.directive('badge', BadgeDirective);
    app.component('primeButton', Button);
    app.component('InputText', InputText);
    app.component('InputGroup', InputGroup);
    app.component('InputGroupAddon', InputGroupAddon);
    app.component('Menu-bar', Menubar);
    app.component('Card', Card);

    app.use(PrimeVue, {
        unstyled: true,
        pt: Lara,
        ptOptions: { mergeProps: true }
    });
}

export default setPrimeVue;