import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';


const ShelterPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: 'var(--color-primary)',
          inverseColor: '#ffffff',
          hoverColor: 'var(--color-primary-hover)',
          activeColor: 'var(--color-primary-active)',
        }
      }
    }
  }
});
export default ShelterPreset;
