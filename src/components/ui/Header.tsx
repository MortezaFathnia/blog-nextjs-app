"use client"
import Spinner from "./Spinner"
import Link from "next/link"
import useStore from "@/store"
import { apiLogoutUser } from "@/lib/api-requests"
import { useRouter } from "next/navigation"
import ChangeTheme from "../layout/ChangeTheme"

const Header = () => {
  const store = useStore()
  const authUser = store.authUser
  const router = useRouter()
  const handleLogout = async () => {
    store.setRequestLoading(true)
    try {
      await apiLogoutUser()
    } catch (error) {
    } finally {
      store.reset()
      router.push("/login")
    }
  }

  return (
    <>
      <header className="nav-bg h-20 mb-1">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <h4>
              <Link href="/" className="text-ct-dark-600 logo text-2xl">
                TechWeb
              </Link>
            </h4>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-ct-dark-600">
                Home
              </Link>
            </li>
            {!authUser && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>
              </>
            )}
            {authUser && (
              <>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
            <li>
            <ChangeTheme />
            </li>

          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  )
}

export default Header
