// src/data/products.ts
var IMAGE_DIMENSIONS = {
	"/logo.png": {
		width: 512,
		height: 512
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.28_6b205af5.jpeg": {
		width: 571,
		height: 1e3
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.28__1__c2cedd6f.jpeg": {
		width: 822,
		height: 809
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.28__2__bc1e83c1.jpeg": {
		width: 960,
		height: 960
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.28__3__e1baab00.jpeg": {
		width: 806,
		height: 806
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.29_6b205af5.jpeg": {
		width: 571,
		height: 1e3
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.29__1__6a5e9556.jpeg": {
		width: 1e3,
		height: 750
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.29__2__aedcdfc8.jpeg": {
		width: 577,
		height: 433
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.29__3__6050481c.jpeg": {
		width: 1280,
		height: 960
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.29__4__f96fb005.jpeg": {
		width: 1e3,
		height: 750
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.30_3625d4c6.jpeg": {
		width: 512,
		height: 599
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.30__1__446355ca.jpeg": {
		width: 375,
		height: 500
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.30__2__1ca73fda.jpeg": {
		width: 375,
		height: 500
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.30__3__f62ba408.jpeg": {
		width: 563,
		height: 1e3
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.31_5541bd0a.jpeg": {
		width: 720,
		height: 540
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.31__1__1bb3299a.jpeg": {
		width: 720,
		height: 986
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.31__2__3a2aab06.jpeg": {
		width: 720,
		height: 976
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.31__3__e98630c6.jpeg": {
		width: 720,
		height: 957
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.31__4__961e971c.jpeg": {
		width: 400,
		height: 400
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.32__1__ef9c0cfc.jpeg": {
		width: 963,
		height: 1280
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.32__2__a4cef269.jpeg": {
		width: 720,
		height: 960
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.32__3__4cebcbe9.jpeg": {
		width: 720,
		height: 960
	},
	"/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.32_c822116a.jpeg": {
		width: 750,
		height: 1e3
	}
};
function getImageDimensions(imageUrl) {
	return IMAGE_DIMENSIONS[imageUrl] ?? {
		width: 800,
		height: 800
	};
}
export { getImageDimensions as n, IMAGE_DIMENSIONS as t };
