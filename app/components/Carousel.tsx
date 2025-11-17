import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { carouselData } from "../data";

const screenWidth = Dimensions.get("window").width;

export default function Corousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<any> | null>(null);

  const handleScroll = (event: any) => {
    const screenPosition = event.nativeEvent.contentOffset.x;
    const index = screenPosition / screenWidth;
    setActiveIndex(index);
  };

  const renderCarouselItem = ({ item }: { item: (typeof carouselData)[0] }) => (
    <View style={styles.itemWrap}>
      <Image source={item.image} style={styles.imageStyel} />
    </View>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselData.length;
      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={styles.indicatorContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex == index && styles.indicatorActive,
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
