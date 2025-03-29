import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';


const commonVars = createGlobalTheme(':root', {
  color: {
    green: '#00D98B',
    greenD: '#00A86C',
    greenL: '#4FFABC',
    red: '#FF3737',
    redD: '#DB0042',
    redL: '#FF7AA2',
    yellow: '#FFB800',
    yellowD: '#E5A500',
    yellowL: '#FFD66B',
    etc: '#E8ECF5',
    modal: 'rgba(0, 0, 0, 0.50)',
    black: '#000000',
    gray3: '#333333',
    gray6: '#666666',
    white: '#FFFFFF',
    shadow: {
      red: 'rgba(255, 57, 57, 0.25)',
    },
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '22px',
    '3xl': '24px',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
    extraBold: '800',
  },
});

const themeColor = createThemeContract({
  color: {
    primary: null,
    primaryD: null,
    primaryL: null,
    primaryB: null,
    text: {
      title: null,
      main: null,
      sub: null,
    },
    disabledText: null,
    background: null,
    disabledBg: null,
    border: null,
    table: null,
    graph: null,
  },
  common: {
    background: null,
    gradient: null,
  },
  gnb: { background: null },
  lnb: {
    background: { default: null, active: null },
    color: { link: null },
  },
  input: {
    background: null,
    border: {
      active: null,
      hover: null,
    },
    text: {
      default: null,
      field: null,
    },
    shadow: null,
  },
  textarea: {
    background: null,
    border: {
      active: null,
      hover: null,
    },
    text: {
      default: null,
      field: null,
    },
    shadow: null,
  },
  select: {
    background: null,
    border: {
      active: null,
      hover: null,
    },
    text: {
      default: null,
      field: null,
    },
    shadow: null,
    option: {
      background: {
        default: null,
        hover: null,
      },
      text: {
        select: null,
      },
      shadow: null,
    },
  },
  button: {
    background: null,
    border: {
      default: null,
      hover: null,
    },
    text: {
      default: null,
      hover: null,
      ghost: {
        hover: null,
      },
    },
    shadow: null,
  },
  table: {
    background: {
      hover: null,
    },
  },
});

createGlobalTheme(':root', themeColor, {
  color: {
    primary: '#3361FF',
    primaryD: '#0033E2',
    primaryL: '#B9C8FF',
    primaryB: '#F5F8FF',
    text: {
      title: '#1D2F6C',
      main: '#5C7099',
      sub: '#A5B1CA',
    },
    background: '#F4F5FA',
    disabledBg: '#F3F5F8',
    disabledText: '#A5B1CA',
    border: '#EAEDF5',
    table: '#F3F8FF',
    graph: '#D4DAE6',
  },
  common: {
    background: commonVars.color.white,
    gradient: themeColor.color.primary,
  },
  gnb: {
    background: commonVars.color.white,
  },
  lnb: {
    background: { default: commonVars.color.white, active: themeColor.color.disabledBg },
    color: { link: themeColor.color.text.sub },
  },
  input: {
    background: commonVars.color.white,
    border: {
      active: themeColor.color.primary,
      hover: themeColor.color.primary,
    },
    text: {
      default: themeColor.color.text.sub,
      field: themeColor.color.text.main,
    },
    shadow: 'rgba(0, 51, 230, 0.40)',
  },
  textarea: {
    background: commonVars.color.white,
    border: {
      active: themeColor.color.primary,
      hover: themeColor.color.primary,
    },
    text: {
      default: themeColor.color.text.sub,
      field: themeColor.color.text.main,
    },
    shadow: 'rgba(0, 51, 230, 0.40)',
  },
  select: {
    background: commonVars.color.white,
    border: {
      active: themeColor.color.primary,
      hover: themeColor.color.primary,
    },
    text: {
      default: themeColor.color.text.sub,
      field: themeColor.color.text.main,
    },
    shadow: 'rgba(0, 51, 230, 0.40)',
    option: {
      background: {
        default: commonVars.color.white,
        hover: themeColor.color.primaryB,
      },
      text: {
        select: themeColor.color.primary,
      },
      shadow: 'rgba(0, 51, 230, 0.10)',
    },
  },
  button: {
    background: commonVars.color.white,
    border: {
      default: themeColor.color.border,
      hover: themeColor.color.primary,
    },
    text: {
      default: themeColor.color.text.main,
      hover: themeColor.color.primary,
      ghost: {
        hover: themeColor.color.primaryD,
      },
    },
    shadow: 'rgba(0, 51, 230, 0.40)',
  },
  table: {
    background: {
      hover: themeColor.color.primaryB,
    },
  },
});



export const vars = { ...commonVars, themeColor };
