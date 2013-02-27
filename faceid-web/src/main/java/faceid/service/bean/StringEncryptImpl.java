/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
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

package faceid.service.bean;

import faceid.service.ApplicationException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;

// Credits to http://www.javacodegeeks.com/2012/05/secure-password-storage-donts-dos-and.html
@Stateless(name = "faceid-StringEncryptImpl")
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class StringEncryptImpl {

    public boolean areEquivalent(String attemptedPassword, byte[] encryptedPassword, byte[] salt) {
        final byte[] encryptedAttemptedPassword = encryptString(attemptedPassword, salt);
        return Arrays.equals(encryptedPassword, encryptedAttemptedPassword);
    }

    public byte[] encryptString(String password, byte[] salt) {
        final String algorithm = "PBKDF2WithHmacSHA1";
        final int derivedKeyLength = 160;
        final int iterations = 20000;
        final KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, derivedKeyLength);
        final byte[] result;
        try {
            final SecretKeyFactory f = SecretKeyFactory.getInstance(algorithm);
            result = f.generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException e) {
            throw new ApplicationException(e);
        } catch (InvalidKeySpecException e) {
            throw new ApplicationException(e);
        }
        return result;
    }

    public byte[] generateSalt() {
        final SecureRandom random;
        try {
            random = SecureRandom.getInstance("SHA1PRNG");
        } catch (NoSuchAlgorithmException e) {
            throw new ApplicationException(e);
        }
        final byte[] salt = new byte[8];
        random.nextBytes(salt);
        return salt;
    }

}
