/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useMemo } from 'react';
import throttle from 'lodash/throttle';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CellMeasurer, {
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import usePrevious from '../../hooks/infiniteScroll/usePrevious';

const InfiniteScroll = ({
  hasMore,
  onScroll = true,
  height,
  loader,
  dataLength,
  children,
  renderer,
  minHeight = 100,
}) => {
  const triggered = useRef(false);

  useEffect(() => {
    triggered.current = false;
  }, [dataLength]);

  const props = useRef({
    hasMore,
    onScroll,
  });

  const scrollListener = e => {
    const { hasMore, onScroll } = props.current;
    if (typeof onScroll === 'function') {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const { clientHeight, scrollHeight, scrollTop } = e;

    if (triggered.current) {
      return;
    }

    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if (atBottom && hasMore) {
      triggered.current = true;
    }
  };

  useEffect(() => {
    props.current = {
      hasMore,
      onScroll,
    };
  }, [hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const rowRenderer = ({ parent, key, index, style }) => {
    let content;

    if (index >= children.length && hasMore) {
      content = loader;
    } else if (index >= children.length && !hasMore) {
      content = '';
    } else {
      content = renderer({
        index,
      });
    }

    return (
      <CellMeasurer
        cache={_cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        width={_mostRecentWidth}
      >
        <div style={style}>{content}</div>
      </CellMeasurer>
    );
  };

  // next() ?????? ??? ???????????? ?????? ?????? ???????????? ??????: ??????????????? rerender????????? _cache?????? ????????????
  // _cache??? minHeight??? ???????????? ????????? ?????? ??????????????? ???
  let _cache = useMemo(
    () =>
      new CellMeasurerCache({
        minHeight,
        fixedWidth: true,
      }),
    [minHeight],
  );

  const _list = useRef();
  const prevLength = usePrevious(children.length);
  let _mostRecentWidth = 0;
  const _resizeAllFlag = useRef(false);

  useEffect(() => {
    if (_resizeAllFlag.current) {
      _resizeAllFlag.current = false;
      _cache.clearAll();
      if (_list.current) {
        _list.current.recomputeRowHeights();
      }
    } else if (prevLength && prevLength !== children.length) {
      const index = prevLength;
      _cache.clear(index, 0);
      if (_list.current) {
        _list.current.recomputeRowHeights(index);
      }
    }
  }, [children, _resizeAllFlag]);

  const _resizeAll = () => {
    _resizeAllFlag.current = false;
    _cache.clearAll();
    if (_list.current) {
      _list.current.recomputeRowHeights();
    }
  };

  /**
   * ?????? 1. height??? ????????? ???????????? ??? -> ?????? ??? ??????...
   * ?????? 2. loader ??????????????? ????????? ?????? ????????? ?????? ?????? -> rowCount + 1?????? index??? rowCount+1??? ?????? ???????????? ??? ???????????? ??? ????????? loader ??????????????? ??????
   * ?????? 3. ???????????? height ?????????? dynamic height ????????? ?????? CellMeasurer ??????
   */
  return (
    <AutoSizer disableHeight>
      {({ width }) => {
        if (_mostRecentWidth && _mostRecentWidth !== width) {
          _resizeAllFlag.current = true;
          setTimeout(_resizeAll, 0);
        }
        return (
          <List
            deferredMeasurementCache={_cache}
            // eslint-disable-next-line react/prop-types
            rowCount={children.length + 1}
            width={width}
            height={height}
            rowHeight={_cache.rowHeight}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
            onScroll={throttleScrollListener}
            ref={_list}
          />
        );
      }}
    </AutoSizer>
  );
};

export default InfiniteScroll;
