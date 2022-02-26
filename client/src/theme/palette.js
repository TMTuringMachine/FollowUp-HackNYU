const palette = {
  colors: {
    primary: "rgb(247, 37, 133)",
    secondary: "rgb(114, 9, 183)",
    background1:"#ffffff",
    color3:'#3A0CA3',
    primaryFaint:"rgba(247, 37, 132, 0.514)",
    secondaryFaint:"rgb(114, 9, 183,0.514)"
  },
  gradients: {
    gradient1: {
      background: "rgb(247,37,133)",
      background:
        "linear-gradient(142deg, rgba(247,37,133,1) 0%, rgba(114,9,183,1) 100%)",
    },
  },
  textGradients:{
    txtGrad1:{
      background:'linear-gradient(142deg, rgba(247,37,133,1) 0%, rgba(114,9,183,1) 70%);',
      backgroundClip:'text',
      textFillColor:'transparent',
    }
  }
};

export default palette;
