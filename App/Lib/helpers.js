import { Dimensions, PixelRatio, Share } from 'react-native';

const DESIGN_WIDTH = 120 * 3.5;
const { width, height } = Dimensions.get('screen');

export const scale = scaleWidth => {
  return (scaleWidth * width) / DESIGN_WIDTH;
};

export function convertPtToPx(pt) {
  return scale(pt * 3.5);
}

export const isEmptyOrSpaces = str => {
  if (str) {
    return str.match(/^ *$/) !== null;
  }
  return true;
};

export function removeHtmlTags(html) {
  return html.replace(/<[^>]*>?/gm, '');
}

export const onShare = async ({
  title,
  message,
  url,
  sharedCallback,
  dismissedCallback,
  errorCallback,
}) => {
  try {
    const result = await Share.share({
      message,
      title,
      url,
    });

    if (result.action === Share.sharedAction) {
      if (typeof sharedCallback === 'function') {
        sharedCallback();
      }
    } else if (result.action === Share.dismissedAction) {
      if (typeof dismissedCallback === 'function') {
        dismissedCallback();
      }
    }
  } catch (error) {
    if (typeof errorCallback === 'function') {
      errorCallback(error);
    }
    console.log({ error });
  }
};
