import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getListCategory } from "@/redux/category/category.thunk";
import { getCart } from "@/redux/cart/cart.thunk";
import { LoadingCenter } from "./LoadingCenter";
import { ArrowRightIcon, HeartHandshakeIcon, LogInIcon, MailIcon, MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.categories);
  const { user, loading } = useAppSelector((state) => state.account);
  const { cart } = useAppSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    dispatch(
      getListCategory({
        limit: 10,
        sortBy: "name",
        page: 1
      })
    );
    dispatch(getCart());
  }, [dispatch]);

  const newCategory = {
    name: "All Product",
    path: "shop",
    subCategories: [{
      name: "New Product",
      path: "#"
    }, {
      name: "Best Seller",
      path: "#"
    }]
  }

  const categoryList = list.map((category) => {
    return {
      name: category.name,
      path: `/category/${category.slug}`,
      subCategories: category.children.map((subCategory) => {
        return {
          name: subCategory.name,
          path: `/category/${subCategory.slug}`
        }
      })
    }
  });
  categoryList.unshift(newCategory);

  const categoryAccordingToNeed = [
    { name: "Men's Underwear", path: "category/men-clothes/men-underwear" },
    { name: "Sports Pants", path: "category/men-clothes/men-sports-pants" },
    { name: "Home Pants", path: "category/men-clothes/men-home-pants" },
  ];

  return (
    <header>
      <nav className="flex flex-row justify-between items-center">
        {/* logo */}
        <Link to="/">
          Clothes Men
        </Link>

        {/* menu */}
        <ul className="hidden md:flex flex-row gap-10">
          <Link className="uppercase" to="/">Home</Link>

          <div className="relative group">
            <Link to="/shop" className="cursor-pointer font-medium uppercase">
              Men
            </Link>

            <div
              className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200
             fixed mt-3 bg-white border border-gray-200 z-50 left-[60px] right-[60px] flex flex-row"
            >

              {/* category */}
              <div className="flex flex-col w-2/3 border-r">
                <div className="p-6 flex gap-10">
                  {categoryList.map((category) => (
                    <ul key={category.name}>
                      <Link
                        to={`${category.path}`}
                        className=" hover:text-red-500 text-xl flex items-center gap-2"
                      >
                        {category.name}
                        <ArrowRightIcon />
                      </Link>
                      {category.subCategories?.map((subCategory) => (
                        <li
                          key={subCategory.name}
                          className="py-3 text-stone-600 hover:text-red-500 text-sm"
                        >
                          <Link to={`${subCategory.path}`}>{subCategory.name}</Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <div className="mt-auto bg-slate-100 px-6 py-4 text-xl flex flex-row gap-4">
                  <div className="text-stone-600 border-r border-gray-200">
                    According To Need
                  </div>

                  {categoryAccordingToNeed.map((c, index) => (
                    <Link
                      key={index}
                      to={`/${c.path}`}
                      className=" hover:text-red-500"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>

              </div>

              {/* image section */}
              <div className="flex flex-col w-1/3 p-8 gap-2">
                <div className="relative">
                  <img
                    className="rounded-xl object-cover"
                    src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
                    alt=""
                  />
                  <span className="absolute bottom-0 m-2 font-bold text-black text-sm">
                    Men's Ultra Light Jeans
                  </span>
                </div>

                <div className="relative">
                  <img
                    className="rounded-xl object-cover"
                    src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
                    alt=""
                  />
                  <span className="absolute bottom-0 m-2 font-bold text-black text-sm">
                    Men's Ultra Light Jeans
                  </span>
                </div>
              </div>

            </div>
          </div>


          <li className="uppercase">
            <Link to="/contact">Contact</Link>
          </li>

          <li className="uppercase">
            <Link to="/care_share">Care&Share</Link>
          </li>
        </ul>

        {/* nav icon */}
        <div className="hidden md:flex flex-row items-center gap-6">
          <Link to="/search">
            <SearchIcon />
          </Link>

          <Link to={'/cart'} className="relative">
            <ShoppingBagIcon />
            <span className="text-xs absolute -right-2 top-3 px-1 text-white rounded-full bg-red-500">
              {cart.length > 0 && cart.length}
            </span>
          </Link>

          <Link to="/account/profile">
            <UserIcon />
          </Link>

        </div >

        {/* display mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <MenuIcon className="w-8 h-8" />
            </SheetTrigger>
            <SheetContent className="h-screen w-screen md:h-auto md:max-w-md">
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4">
                <Link className="px-4" to="/">
                  Clothes Men
                </Link>

                <div className="bg-slate-200">
                  <div className="bg-white border rounded-lg m-4 px-2 ">
                    <div className="text-lg py-2 uppercase">
                      Men
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryList.map((category) =>
                        <AccordionItem key={category.name} value={category.name} className="border-none">
                          <AccordionTrigger className="hover:no-underline py-2">
                            {category.name}
                          </AccordionTrigger>
                          <AccordionContent className="px-3 flex flex-col gap-4">
                            <Link
                              to={category.path}
                            >
                              {category.name} list
                            </Link>
                            {category.subCategories.map((subCategory) =>
                              <Link
                                to={subCategory.path}
                                key={subCategory.name}
                              >
                                {subCategory.name}
                              </Link>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>
                  </div>
                </div>

                <div className="flex flex-col gap-4 px-4">
                  <Link to="/contact" className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5" />
                    Contact
                  </Link>

                  <Link to="/care&share" className="flex items-center gap-2">
                    <HeartHandshakeIcon className="w-5 h-5" />
                    Care & Share
                  </Link>

                  <Link to="/cart" className="flex items-center gap-2">
                    <div className="relative">
                      <ShoppingBagIcon className="w-5 h-5" />
                      <span className="absolute -right-2 top-2 text-white text-xs px-1 rounded-full bg-red-500">
                        {cart.length > 0 && cart.length}
                      </span>
                    </div>
                    Cart
                  </Link>

                  {loading.getProfile ? (
                    <LoadingCenter />
                  ) : user ? (
                    <>
                      <Link to="/account/profile" className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        Account
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/auth/login" className="flex items-center gap-2">
                        <LogInIcon className="w-5 h-5" />
                        Login
                      </Link>

                      <Link to="/auth/register" className="flex items-center gap-2">
                        <UserPlusIcon className="w-5 h-5" />
                        Register
                      </Link>
                    </>
                  )}

                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div >

      </nav >
    </header >
  );
};

export default NavBar;
