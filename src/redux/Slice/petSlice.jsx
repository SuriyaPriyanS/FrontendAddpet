import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api'; // Import the axios instance from api.js

const initialState = {
  pets: [],
  pet: null,
  adoptions: [],
  loading: false,
  error: null,
};

const apiKey = 'YOUR_API_KEY';

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('https://suriyaadption.onrender.com/api/getpetall', {
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
  async (petId, { rejectWithValue }) => {
    try {
      const response = await api.get(`https://suriyaadption.onrender.com/api/getpetall/${petId}`, {
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

export const addPet = createAsyncThunk(
  'pets/addPet',
  async (newPet, { rejectWithValue }) => {
    try {
      const response = await api.post('https://suriyaadption.onrender.com/api/pet', newPet, {
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

export const updatePet = createAsyncThunk(
  'pets/updatePet',
  async (updatedPet, { rejectWithValue }) => {
    try {
      const { petId, ...petData } = updatedPet;
      const response = await api.put(`https://suriyaadption.onrender.com/api/pet/${petId}`, petData, {
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
      await api.delete(`https://suriyaadption.onrender.com/api/pet/${petId}`, {
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

export const fetchAdoptions = createAsyncThunk(
  'adoptions/fetchAdoptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('https://suriyaadption.onrender.com/api/adoptions', {
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

export const initiateAdoption = createAsyncThunk(
  'pets/initiateAdoption',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await api.post(`https://suriyaadption.onrender.com/api/adoptpet/${petId}`, {}, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return { petId, data: response.data };
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
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.map((pet) => 
          pet._id === action.payload._id ? action.payload : pet
        );
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = state.pets.filter((pet) => pet._id !== action.payload);
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdoptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdoptions.fulfilled, (state, action) => {
        state.loading = false;
        state.adoptions = action.payload;
      })
      .addCase(fetchAdoptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(initiateAdoption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateAdoption.fulfilled, (state, action) => {
        state.loading = false;
        const adoptedPetId = action.payload.petId;
        state.pets = state.pets.map((pet) =>
          pet._id === adoptedPetId ? { ...pet, status: 'adopted' } : pet
        );
      })
      .addCase(initiateAdoption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectPets = (state) => state.pets.pets;



export default petSlice.reducer;
