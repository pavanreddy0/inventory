"use client";
import Image from "next/image";
import { firestore } from "@/firebase";
import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/system";
import { Button, Modal, TextField, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    let inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });

    setInventory(inventoryList);
  };

  const removeItemFromInventory = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const { count } = snapshot.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }

    await updateInventory();
  };

  const addItemtoInventory = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const { count } = snapshot.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }

    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
            width={400}
            bgcolor="white"
            border="2px solid black"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              ></TextField>
              <Button
                variant="outlined"
                onClick={() => {
                  addItemtoInventory(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Box border="1px solid #333">
          <Box
            width="800px"
            height="100px"
            bgcolor="#ADD8E6"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2" color="#333">
              Inventory Items
            </Typography>
          </Box>

          <Stack width="800px" height="auto" spacing={2} overflow="auto">
            {inventory.map(({ name, count }) => (
              <>
                <Box
                  key={name}
                  width="100%"
                  minHeight="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding={5}
                  bgcolor="#f0f0f0"
                >
                  <Typography variant="h3" color="#333" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="h3" color="#333" textAlign="center">
                    {count}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => addItemtoInventory(name)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => removeItemFromInventory(name)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              </>
            ))}
          </Stack>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
        >
          Add New Item
        </Button>
      </Box>
    </>
  );
}
