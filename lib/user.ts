import { useState, useEffect } from 'react'


export async function fetchUser(cookie = '') {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.__user) {
        // @ts-ignore
        return window.__user
    }

    const res = await fetch(
        '/api/me',
        cookie
            ? {
                headers: {
                    cookie,
                },
            }
            : {}
    )

    if (!res.ok) {
        // @ts-ignore
        delete window.__user
        return null
    }

    const json = await res.json()
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.__user = json
    }
    return json
}

// @ts-ignore
export function useFetchUser({ required } = {}) {
    const [loading, setLoading] = useState(
        // @ts-ignore
        () => !(typeof window !== 'undefined' && window.__user)
    )
    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }

        // @ts-ignore
        return window.__user || null
    })

    useEffect(
        () => {
            if (!loading && user) {
                return
            }
            setLoading(true)
            let isMounted = true

            fetchUser().then((user) => {
                // Only set the user if the component is still mounted
                if (isMounted) {
                    // When the user is not logged in but login is required
                    if (required && !user) {
                        window.location.href = '/api/login'
                        return
                    }
                    setUser(user)
                    setLoading(false)
                }
            })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return { user, loading }
}