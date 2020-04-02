import React from "react";
import { css } from "styled-components";
import { fakeApi } from "api";
import { useInfinityApiCall } from "hooks";
import { RouteComponentProps } from "react-router-dom";

import Box from "component/atoms/box/Box";
import ProductionList from "component/organisms/productionList/ProductionList";
import LoadingBoundary from "component/molecules/loadingBoundary/LoadingBoundary";

type OuterProps = {} & RouteComponentProps;

function Outer({ location }: OuterProps) {
  const pageName = location.pathname.substring(1);
  const { isLoading, pList } = useInfinityApiCall({
    apiFetch: fakeApi.fetch,
    pageName,
    isEmptyArray: true
  });

  return (
    <Box
      css={css`
        padding: 15px 10px;
      `}
    >
      <LoadingBoundary isLoading={isLoading}>
        <ProductionList pList={pList}></ProductionList>
      </LoadingBoundary>
    </Box>
  );
}

export default Outer;