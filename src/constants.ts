export const CMS_PATH = '/public/cms';
export const ARCHIVE_PATH = `${CMS_PATH}/archive`;
export const SITE_NAME = 'Great Danes';
export const WITH_SITE_TITLE_SUFFIX = (s: string) => `${s} | ${SITE_NAME}`;
export const SITE_DESCRIPTION =
	'Great Danes is a design archive dedicated to mid-century masterpieces from Denmark.';
export const SITE_URL = 'great-danes.roeybiran.com';
export const UNKNOWN_MODEL = 'Model Name Unknown';
export const READ_MORE = 'Read more';
export const COMING_SOON = 'Coming soon';

// 3d
const sceneBgColor = '#ffffff';
const mainLightColor = '#ffffff';
const mainLightIntensity = 1;
const hemiLightGroundColor = '#c8042c';
const floorColor = '#ffffff';
const hemiLightIntensity = 0.5;
const fogNear = 1;
const fogFar = 20;
const shadowMapSize = 1024;

export const DEFAULTS = {
	mainLightColor,
	mainLightIntensity,
	sceneBgColor,
	floorColor,
	hemiLightGroundColor,
	hemiLightIntensity,
	shadowMapSize,
	fogNear,
	fogFar,
};
