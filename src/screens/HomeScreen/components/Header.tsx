import Chip from "components/Chip";
import { styles } from "../HomeScreen";
import { View, Text, ScrollView, Image } from "react-native";
import HeroImage from "assets/images/hero.png";
import TextInput from "components/TextInput";

type Props = {
  search: string;
  handleSearchChange: (text: string) => void;
  categories: string[];
  selectedCategories: string[];
  handleCategoryPress: (category: string) => () => void;
};

const Header: React.FC<Props> = ({
  search,
  handleSearchChange,
  categories,
  selectedCategories,
  handleCategoryPress,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Little Lemon</Text>
        <View style={styles.row}>
          <View style={styles.headerContent}>
            <Text style={styles.subtitle}>Chicago</Text>
            <Text style={styles.description}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist
            </Text>
          </View>
          <Image source={HeroImage} style={styles.image} resizeMode="cover" />
        </View>
        <TextInput
          style={styles.search}
          placeholder="Search"
          value={search}
          onChangeText={handleSearchChange}
        />
      </View>
      <View>
        <Text style={styles.menuHeader}>Order for delivery</Text>
        <ScrollView horizontal style={styles.categories}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onPress={handleCategoryPress(category)}
              selected={selectedCategories.includes(category)}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Header;
