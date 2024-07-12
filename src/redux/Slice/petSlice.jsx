import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '.././../api'; // Import the axios instance from api.js

const initialState = {
  pets: [],
  pet: null,
  loading: false,
  error: null,
};

const apiKey = 'YOUR_API_KEY';

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/pet', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPet = createAsyncThunk(
  'pets/fetchPet',
  async (searchName, { rejectWithValue }) => { // Changed petId to searchName as it seems more appropriate
    try {
      const response = await api.get(`/api/pet?Name=${searchName}&key=${apiKey}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePet = createAsyncThunk(
  'pets/deletePet',
  async (petId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/pet/${petId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return petId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(fetchPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter((pet) => pet.id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
