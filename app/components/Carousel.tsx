import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { carouselData } from "../data";

const screenWidth = Dimensions.get("window").width;

export default function Corousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<any> | null>(null);
  const currentIndexRef = useRef(1);

  const loopData = useMemo(() => {
    if (!carouselData.length) return [];
    const first = carouselData[0];
    const last = carouselData[carouselData.length - 1];
    return [last, ...carouselData, first];
  }, []);

  const startIndex = 1;

  useEffect(() => {
    if (!loopData.length) return;
    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: startIndex,
        animated: false,
      });
      currentIndexRef.current = startIndex;
    }, 0);
  }, [loopData.length]);

  const renderCarouselItem = ({ item }: { item: (typeof carouselData)[0] }) => (
    <View style={styles.itemWrap}>
      <Image source={item.image} style={styles.imageStyel} />
    </View>
  );

  useEffect(() => {
    if (!loopData.length) return;
    const interval = setInterval(() => {
      let nextLoopIndex = currentIndexRef.current + 1;
      if (nextLoopIndex > carouselData.length + 1) {
        nextLoopIndex = 1;
      }
      listRef.current?.scrollToIndex({
        index: nextLoopIndex,
        animated: true,
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [loopData.length]);

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!carouselData.length) return;
    const offsetX = e.nativeEvent.contentOffset.x;
    let indexInLoop = Math.round(offsetX / screenWidth);
    if (indexInLoop === 0) {
      indexInLoop = carouselData.length;
      listRef.current?.scrollToIndex({
        index: indexInLoop,
        animated: false,
      });
    }
    if (indexInLoop === carouselData.length + 1) {
      indexInLoop = 1;
      listRef.current?.scrollToIndex({
        index: indexInLoop,
        animated: false,
      });
    }
    currentIndexRef.current = indexInLoop;
    const realIndex = indexInLoop - 1;
    setActiveIndex(realIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={loopData}
        renderItem={renderCarouselItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumEnd}
      />
      <View style={styles.indicatorContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  itemWrap: {
    width: screenWidth,
    paddingHorizontal: 15,
    height: 180,
  },
  imageStyel: { height: "100%", width: "100%", borderRadius: 12 },
  indicatorContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  indicator: { backgroundColor: "#ddd", width: 8, height: 8, borderRadius: 4 },
  indicatorActive: { backgroundColor: "#1CC9B0", width: 24, borderRadius: 5 },
});
