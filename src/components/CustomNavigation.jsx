import { Appbar, Menu } from "react-native-paper";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function CustomNavigationBar({ navigation, back }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function signOutBtnFuncCombine() {
    signOut(auth);
  }

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Journey Journal" />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="black" onPress={openMenu} />
          }
        >
          <Menu.Item onPress={() => signOutBtnFuncCombine()} title="Sign out" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default CustomNavigationBar;
