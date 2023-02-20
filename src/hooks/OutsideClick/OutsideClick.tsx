import React, { useRef, useEffect, FC, RefObject, ReactElement } from "react";

export const useOutsideClick = ({
  ref,
  onOutsideClick,
}: {
  onOutsideClick: () => void;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

type PropsT = {
  onOutsideClick: () => void;
  children: ReactElement;
};

export const OutsideClick: FC<PropsT> = ({ onOutsideClick, children }) => {
  const wrapperRef = useRef(null);

  useOutsideClick({ ref: wrapperRef, onOutsideClick });

  return <div ref={wrapperRef}>{children}</div>;
};
