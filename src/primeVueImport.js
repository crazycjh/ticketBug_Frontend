import PrimeVue from "primevue/config";
import Lara from "@/presets/lara";

import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import AutoComplete from 'primevue/autocomplete';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import PrimeDialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import OverlayPanel from 'primevue/overlaypanel';


const setPrimeVue = (app) => {
    app.directive('badge', BadgeDirective);
    app.component('Badge', Badge);
    app.component('primeButton', Button);
    app.component('InputText', InputText);
    app.component('InputGroup', InputGroup);
    app.component('InputGroupAddon', InputGroupAddon);
    app.component('Menu-bar', Menubar);
    app.component('Card', Card);
    app.component('SkeletonLoading', Skeleton);
    app.component('Slider', Slider);
    app.component('AutoComplete', AutoComplete);
    app.component('Checkbox', Checkbox);
    app.component('InputSwitch', InputSwitch);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('PrimeDialog', PrimeDialog);
    app.component('Calendar', Calendar);
    app.component('OverlayPanel', OverlayPanel);
    

    app.use(PrimeVue, {
        unstyled: true,
        pt: Lara,
        ptOptions: { mergeProps: true }
    });
}

export default setPrimeVue;