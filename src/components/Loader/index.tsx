import React from 'react';

import {Content, Wrapper} from "@/components/Loader/styled";

const Loader: React.FC<{
  loading: boolean;
}> = ({ loading }) => {
  return (
    <Wrapper isVisible={loading}>
      <Content className="loading-line"></Content>
    </Wrapper>
  );
};

export default Loader;
