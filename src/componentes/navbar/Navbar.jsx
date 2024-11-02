import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { useNavigate } from "react-router-dom";

export default function NavbarCompo() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isShow, setShow] = React.useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    // Only use e.preventDefault() if e is defined
    if (e) {
      e.preventDefault();
    }
    if (!query) return;

    // Navigate to the search result page with the query as a URL parameter
    navigate(`/search-result?query=${encodeURIComponent(query)}`);
  };

  const menuItems = ["Movies", "TV Series", "Recent Release"];

  return (
    <Navbar
      className="bg-color"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          className="text-white"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand className={isShow ? "hidden" : "block"}>
          <h1 className="text-2xl font-semibold text-white">MovieMania</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <h1 className="text-2xl font-semibold text-white">MovieMania</h1>
        </NavbarBrand>
        <NavbarItem className="md:pl-8 ">
          <Link className="text-white" href="/">
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Tooltip showArrow={true} content="Coming soon">
            <Link className="text-white" href="/">
              Tv Series
            </Link>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-white" href="/">
            Recent Release
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="">
          <SearchIcon
            className={isShow ? "hidden" : "block md:hidden"}
            onClick={() => setShow(true)}
          ></SearchIcon>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            {" "}
            {/* Handle Enter key and search click */}
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e); // Pass the event when Enter is pressed
                }
              }}
              classNames={{
                base: `lg:w-[400px] w-[220px] input-box rounded-sm flex-1 h-10 ${
                  isShow ? "block" : "md:block hidden"
                }`,
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal",
              }}
              placeholder="Search Movies, TV Series...."
              size="md"
              endContent={
                <SearchIcon
                  onClick={handleSearch} // Clicking the icon also triggers the search
                  size={20}
                  className="text-black cursor-pointer"
                />
              }
              type="search"
            />
          </form>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-color">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-white " href="#" size="md">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
