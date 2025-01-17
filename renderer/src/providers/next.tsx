import * as React from 'react'

// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react'

function NextUIApp({ children }: React.PropsWithChildren) {
	return <NextUIProvider>{children}</NextUIProvider>
}

export default NextUIApp
