import reactions from './reactions/slices';
import currentScreen from './currentScreen/slices';
import language from './language/slices';

export default {
  reactionsFeature: reactions.reducer,
  currentScreenFeature: currentScreen.reducer,
  languageFeature: language.reducer,
};
