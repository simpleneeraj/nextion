/* ********************************************************************
 *   Declaration file for the API exposed over the context bridge
 *********************************************************************/

export interface EContext {
	notify: (
		title: string,
		body: string
	) => Promise<{ success: boolean; error?: string }>
}

declare global {
	interface Window {
		electron: EContext
	}
}
