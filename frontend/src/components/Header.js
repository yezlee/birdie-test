import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Mood", href: "/mood", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure
      as="nav"
      className="bg-birdie_dark_blue absolute inset-x-0 top-0 w-full"
    >
      {({ open }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* logo */}
              <Link to="/">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto lg:block"
                    src="https://i.postimg.cc/0yj4gHyD/birdie-logo.png"
                    alt="Your Company"
                  />
                </div>
              </Link>
              {/* navigation menu */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-birdie_light_blue "
                          : "text-blue-100   hover:bg-birdie_light_dark_blue",
                        "px-3 py-2 rounded-md text-lg text-white-300 font-thin"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
