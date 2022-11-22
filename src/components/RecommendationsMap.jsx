import { Text } from "react-native-paper";

function RecommendationsMap({placeId}){
  console.log('placeId: ', placeId);
  return (
    <Text>{placeId}</Text>
  )
}

export default RecommendationsMap;