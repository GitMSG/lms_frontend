<template>
  <div id="profile">
    <ul>
      <li v-for="aProfile in profiles" v-bind:key="aProfile.profileId" class="list">
        <router-link
          v-bind:to="{name: 'admnprofile',
                    params: {profile: aProfile, currentpermission:permission}}"
        >
          <div id="image-div">
            <img :src="aProfile.profilePic" class="profilePic" height="200px" />
          </div>
        </router-link>
        <div id="profile-detail">
          <h1>{{aProfile.firstname+" "+aProfile.lastname}}</h1>
          <h2>
            <span class="label">Location</span>
            {{aProfile.campusShortCode}}
          </h2>
          <h2>
            <span class="label">Position</span>
            {{aProfile.role}}
          </h2>
          <h2>
            <span class="label">Start Date</span>
            {{aProfile.startDate}}
          </h2>
        </div>
        <div class="time-div">
          <p>
            Compliance Total:
            <span class="compliance">{{aProfile.complianceTime/60}}</span>
          </p>
          <p>
            Elective Total:
            <span class="elective">{{aProfile.electiveTime/60}}</span>
          </p>
          <p>
            Total:
            <span class="total">{{aProfile.electiveTime/60 + aProfile.complianceTime/60}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import auth from '../auth'
import profileService from '../services/ProfileService'

export default {
  components: {},
  name: "allProfiles",
  data() {
    return {
      permission: auth.getUser().rol,
      profiles: [],
      compSum: 0,
      elecSum: 0,
    };
  },

  created() {
    profileService.getAllProfiles()
      .then((response) => {
        return response.json();
      })
      .then((theData) => {
        this.profiles = theData;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#profile {
  min-height: 100vh;
  padding: 0px 10px;
  color: white;
}
.img-button {
  background: none;
  border: none;
}
.profilePic {
  border-radius: 50%;
}
.label {
  font-weight: lighter;
}
.list {
  display: flex;
  justify-content: space-evenly;
  margin: 0px 20px 20px 20px;
  padding: 10px;
  background-color: rgba(32, 33, 36, 0.9);
   box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12); */
  border: 1px solid #1c9a2f;
  border-radius: 3px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>