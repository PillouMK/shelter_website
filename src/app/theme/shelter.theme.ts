import {definePreset} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

type DesignToken = (path: string) => string;

const ShelterPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        custom: {
          0: '#ffffff',
          50: '#9F496E',
          100: '#F38071'
        },
        hover: {
          50: '#8A3D5D',
          100: '#EF6B5C'
        },
        active: {
          50: '#7A334F',
          100: '#E95A49',
        }
      },
    }
  },
  components: {
    button: {
      css: ({ dt }: { dt: DesignToken }) => `
        .p-button.p-button-primary {
          background-color: ${dt('custom.100')};
        }
        .p-button.p-button-primary:enabled:hover {
          background-color:${dt('hover.100')};
        }
        .p-button.p-button-primary:enabled:active {
          background-color: ${dt('active.100')};
        }

        .p-button.p-button-secondary {
          border-color: ${dt('custom.50')};
          color: ${dt('custom.50')};
          transition: color 400ms, box-shadow 700ms;
        }

        .p-button.p-button-secondary:enabled:hover {
          border-color: ${dt('hover.50')};
          color: ${dt('custom.0')};
          box-shadow: inset 20rem 0 0 0 ${dt('hover.50')};
        }

        .p-button.p-button-secondary:enabled:active {
          border-color: ${dt('active.50')};
          color: ${dt('custom.0')};
          box-shadow: inset 20rem 0 0 0 ${dt('active.50')};
        }
      `
    }
  }
});
export default ShelterPreset;
