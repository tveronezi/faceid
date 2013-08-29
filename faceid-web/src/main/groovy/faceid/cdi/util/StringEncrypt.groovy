/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License") you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package faceid.cdi.util

import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec
import javax.enterprise.context.ApplicationScoped
import java.security.SecureRandom

@ApplicationScoped
class StringEncrypt {
    // Credits to http://www.javacodegeeks.com/2012/05/secure-password-storage-donts-dos-and.html

    private def random = new SecureRandom()

    private static final def ALGORITHM = 'PBKDF2WithHmacSHA1'
    private static final def DERIVED_KEY_LENGTH = 160
    private static final def ITERATIONS = 20000

    static boolean areEquivalent(String attemptedPassword, byte[] encryptedPassword, byte[] salt) {
        byte[] encryptedAttemptedPassword = encryptString(attemptedPassword, salt)
        Arrays.equals(encryptedPassword, encryptedAttemptedPassword)
    }

    static byte[] encryptString(String password, byte[] salt) {
        def spec = new PBEKeySpec(password.toCharArray(), salt, ITERATIONS, DERIVED_KEY_LENGTH)
        SecretKeyFactory.getInstance(ALGORITHM).generateSecret(spec).getEncoded()
    }

    static byte[] generateSalt() {
        def random = SecureRandom.getInstance('SHA1PRNG')
        def salt = new byte[8]
        random.nextBytes(salt)
        salt
    }

    String getRandomString() {
        new BigInteger(130, random).toString(32)
    }
}
