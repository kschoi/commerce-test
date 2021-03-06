import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useIScroll } from "hooks";
import IScroll from "iscroll";
import { scrollMoveTo } from "utils";

import ThumbMenuItem from "component/molecules/thumbMenuItem/ThumbMenuItem";
import RouteLink from "component/atoms/routeLink/RouteLink";
import Button from "component/atoms/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { ITabHook } from "types";

type HorizontalScrollThumbMenuProps = {
  menuData: ITabHook;
  onMenuToggle: () => void;
};

type MenuListStyledProps = {
  width?: number;
};

const HorizontalScrollThumbMenuStyled = styled.div`
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  padding: 0 10px;
  touch-action: none;
  &:after {
    position: absolute;
    pointer-events: none;
    top: 0;
    bottom: 0;
    right: 0;
    width: 54px;
    content: "";
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 1) 24%
    );
  }
`;

const HorizontalScrollThumbMenuInnerStyled = styled.div``;

const MenuListStyled = styled.ul<MenuListStyledProps>`
  overflow: hidden;
  width: ${props => `${props.width}px` || `100%`};
  margin: 0 -5px;
`;
const MenuItemStyled = styled.li`
  float: left;
  width: 60px;
  text-align: center;
`;

const RIGHT_PADDING = 54;
const MENU_ITEM_WIDTH = 60;

function HorizontalScrollThumbMenu({
  menuData,
  onMenuToggle
}: HorizontalScrollThumbMenuProps) {
  const $elemMenuScrollWrapper = useRef<HTMLDivElement>(null);
  const { tabList, currentTabIndex } = menuData;
  const menuLength = tabList.length;
  const menuListWidth = MENU_ITEM_WIDTH * menuLength + RIGHT_PADDING;

  const iScroll = useIScroll($elemMenuScrollWrapper, currentTabIndex);

  // console.log("currentTabIndex", currentTabIndex);
  // 메뉴 클릭시 가운데로 이동
  useEffect(() => {
    if (iScroll && $elemMenuScrollWrapper.current) {
      const startX = scrollMoveTo(
        $elemMenuScrollWrapper.current,
        currentTabIndex
      );
      // console.log("startX", startX);
      iScroll.scrollTo(startX, 0, 600, (IScroll as any).utils.ease.circular);
    }
  }, [currentTabIndex, iScroll]);

  return (
    <HorizontalScrollThumbMenuStyled>
      <HorizontalScrollThumbMenuInnerStyled
        id="menuWrapper"
        ref={$elemMenuScrollWrapper}
      >
        <MenuListStyled width={menuListWidth}>
          {tabList.map(menu => (
            <MenuItemStyled key={menu.id}>
              <RouteLink
                to={menu.id}
                css={css`
                  padding: 0 5px;
                `}
              >
                <ThumbMenuItem menu={menu}></ThumbMenuItem>
              </RouteLink>
            </MenuItemStyled>
          ))}
        </MenuListStyled>
        <Button
          css={css`
            position: absolute;
            top: 0;
            bottom: 16px;
            right: 10px;
            width: 34px;
            z-index: 10;
          `}
          onClick={onMenuToggle}
        >
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </Button>
      </HorizontalScrollThumbMenuInnerStyled>
    </HorizontalScrollThumbMenuStyled>
  );
}

export default HorizontalScrollThumbMenu;
