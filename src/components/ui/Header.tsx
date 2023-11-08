"use client"
import Spinner from "./Spinner"
import Link from "next/link"
import useStore from "@/store"
import { apiLogoutUser } from "@/lib/api-requests"
import { useRouter } from "next/navigation"
import ChangeTheme from "../layout/ChangeTheme"
import { useState } from "react"

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
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  return (
    <div className="nav-bg h-20 mb-1">
      <nav className="relative px-4 py-4 flex justify-between items-center">
        <div className="flex items-center justify-between  border-gray-400">
          <Link className="hidden md:block text-3xl font-bold leading-none" href="/">
            <svg className="h-10" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 142">
              <path d="m84.841 28.3l28.773 28.772l28.772 29.51l27.297 27.296l-28.772 28.035l-27.297-26.559L84.84 86.582l-8.115 6.64l-36.887 37.625l-11.067 11.066L0 113.878l10.329-12.541L84.84 28.299ZM171.16 0L256 84.104l-28.772 29.51l-56.07-56.07l-19.919 19.92l-28.772-28.772L171.159 0Z" />
            </svg>
          </Link>
          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> // toggle class based on isNavOpen state
                <div
                  className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <Link href="/home">Home</Link>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <Link href="/posts/add">AddPost</Link>
                  </li>
                </ul>
              </div>
            </section>

            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2   lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
              {authUser && (
                <>
                  <li>
                    <Link className="text-sm text-gray-400 hover:text-white" href="/">Home</Link>
                  </li>
                  <li className="text-pink">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </li>
                  <li><Link className="text-sm text-gray-400 hover:text-white" href="/posts/add">AddPost</Link></li>
                </>
              )}

              {
                !authUser && (
                  <>

                    <li><Link className="text-sm font-bold hover:text-white" href="/login">Login</Link></li>
                    <li className="text-pink">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </li>
                    <li><Link className="text-sm text-gray-400 hover:text-white" href="/register">Register</Link></li>
                  </>
                )
              }

            </ul>
          </nav>

          <style>{`
            .hideMenuNav {
              display: none;
            }
            .showMenuNav {
              display: block;
              position: absolute;
              width: 100%;
              height: 100vh;
              top: 0;
              left: 0;
              background: white;
              z-index: 10;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
            }
          `}</style>

        </div>
        <ChangeTheme />
      </nav>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.requestLoading && <Spinner color="text-white" />}
      </div>
    </div>
  );

}

export default Header
